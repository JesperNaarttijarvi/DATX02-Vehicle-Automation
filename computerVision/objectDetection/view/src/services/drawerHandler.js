import httpService from './httpService'
import qs from 'qs'

const drawerHandler = {
  baseUrl: '/drawer/'
}

drawerHandler.uploadImages = async (projectName, formData) => {
  const axios = require('axios')

  const res = await axios.post(`https://withtheboys.se/kandidat/uploadProjectFiles?projectName=${projectName}`, formData, {
  headers: {
      'Content-Type': 'multipart/form-data'
  }
  });
  console.log(res)
  return res.data
}

drawerHandler.uploadWeights = async (projectName, formData) => {
  const axios = require('axios')

  const res = await axios.post(`https://withtheboys.se/kandidat/uploadProjectWeights?projectName=${projectName}`, formData, {
  headers: {
      'Content-Type': 'multipart/form-data'
  }
  });
  return res.data
}

drawerHandler.downloadProject = async (projectName) => {
  const request = {
    url: `downloadProject?projectName=${projectName}`,
    timeout: 3000000,
    retry: false
  }

  const response = await httpService.get(request)
  return response.data
}

drawerHandler.startAutomaticMarking = async (projectName) => {
  const request = {
    url: `startAutomaticMarking?projectName=${projectName}`,
    timeout: 3000000,
    retry: false
  }

  const response = await httpService.get(request)
  return response.data
}

drawerHandler.checkAutomaticMarking = async (projectName) => {
  const request = {
    url: `checkAutomaticMarking?projectName=${projectName}`,
    timeout: 3000000,
    retry: false
  }

  const response = await httpService.get(request)
  return response.data
}


drawerHandler.uploadNewProject = async (args) => {
  const request = {
    url: 'uploadNewProject',
    timeout: 3000000,
    data: qs.stringify(args),
    retry: false
  }

  const response = await httpService.post(request)
  return response.data
}

drawerHandler.getProjects = async () => {
  const request = {
    url: 'getProjects',
    retry: false
  }

  const response = await httpService.get(request)
  return response.data

}

drawerHandler.saveProgress = async (args) => {
  const request = {
    url: 'saveProgress',
    timeout: 30000,
    data: qs.stringify(args),
    retry: false
  }

  const response = await httpService.post(request)
  return response.data

}

drawerHandler.loadProject = async (projectName) => {
  const request = {
    url: `loadProgress?projectName=${projectName}`,
    retry: false
  }
  const response = await httpService.get(request)
  return response.data

}
export default drawerHandler
