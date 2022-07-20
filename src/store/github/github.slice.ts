import axios from 'axios';
import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import * as I from '@interfaces';
import { NavigateFunction } from 'react-router-dom';

const initialState: I.GithubSlice = {
  search: '',
  organizationName: '',
  errorMessage: '',
  repositories: [],
  isLoading: false,
  hasRepository: false,
};

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.errorMessage = '';
    },
    changeErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    loaderSwitcher(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    updateState: (state, action: PayloadAction<object>) => {
      return { ...state, ...action.payload };
    },
    resetState: () => initialState,
  },
});

const { changeErrorMessage, loaderSwitcher, updateState } = githubSlice.actions;

const searchSubmit = (orgName: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
  try {
    dispatch(loaderSwitcher(true));
    const { data } = await axios.get<I.SearchResponse>(`orgs/${orgName}`);
    if (data.has_repository_projects) {
      dispatch(updateState({ hasRepository: true, organizationName: data.name }));
      navigate('/repositpries');
    } else {
      dispatch(changeErrorMessage('Организация не имеет никаких репозиториев'));
    }
    dispatch(loaderSwitcher(false));
  } catch (error) {
    dispatch(loaderSwitcher(false));
    let message: string = '';
    if (axios.isAxiosError(error) && error.response) {
      //@ts-ignore
      message = error.response.data.message;
    } else message = String(error);
    dispatch(changeErrorMessage(message));
  }
};

const getRepositories = (orgName: string, signal: AbortSignal) => async (dispatch: Dispatch) => {
  try {
    dispatch(loaderSwitcher(true));
    const params = { type: 'all', per_page: 50 };
    const { data: repositories } = await axios.get<I.RepositoriesResponse>(`orgs/${orgName}/repos`, { params, signal });
    dispatch(updateState({ repositories }));
    dispatch(loaderSwitcher(false));
  } catch (error) {
    dispatch(loaderSwitcher(false));
    let message: string = '';
    if (axios.isAxiosError(error) && error.response) {
      //@ts-ignore
      message = error.response.data.message;
    } else message = String(error);

    if (!axios.isCancel(error)) {
      dispatch(changeErrorMessage(message));
    }
  }
};

export const githubReducer = githubSlice.reducer;
export const githubActions = { ...githubSlice.actions, searchSubmit, getRepositories } as const;
