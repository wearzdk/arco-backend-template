import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import useAppStore from '../app'
import type { UserState } from './types'
import type {
  LoginData,
} from '@/api/user'
import {
  getUserInfo,
  login as userLogin,
  logout as userLogout,
} from '@/api/user'
import { clearToken, setToken } from '@/utils/auth'
import { removeRouteListener } from '@/utils/route-listener'

const defaultUserState: UserState = {
  name: undefined,
  avatar: undefined,
  job: undefined,
  organization: undefined,
  location: undefined,
  email: undefined,
  introduction: undefined,
  personalWebsite: undefined,
  jobName: undefined,
  organizationName: undefined,
  locationName: undefined,
  phone: undefined,
  registrationDate: undefined,
  accountId: undefined,
  certification: undefined,
  role: '',
}

const useUserStore = defineStore('user', () => {
  const state = ref<UserState>({ ...defaultUserState })

  const userInfo = computed(() => ({ ...state.value }))

  function switchRoles() {
    return new Promise((resolve) => {
      state.value.role = state.value.role === 'user' ? 'admin' : 'user'
      resolve(state.value.role)
    })
  }

  function setInfo(partial: Partial<UserState>) {
    Object.assign(state.value, partial)
  }

  function resetInfo() {
    Object.assign(state.value, defaultUserState)
  }

  async function info() {
    const res = await getUserInfo()
    setInfo(res.data)
  }

  async function login(loginForm: LoginData) {
    try {
      const res = await userLogin(loginForm)
      setToken(res.data.token)
    }
    catch (err) {
      clearToken()
      throw err
    }
  }

  function logoutCallBack() {
    const appStore = useAppStore()
    resetInfo()
    clearToken()
    removeRouteListener()
    appStore.clearServerMenu()
  }

  async function logout() {
    try {
      await userLogout()
    }
    finally {
      logoutCallBack()
    }
  }

  return {
    state,
    userInfo,
    switchRoles,
    setInfo,
    resetInfo,
    info,
    login,
    logout,
    logoutCallBack,
  }
})

export default useUserStore
