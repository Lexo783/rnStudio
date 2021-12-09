import configApi from './configApi/configApi';
async function GetMoviesPopular(page = null) {
  return fetch(
    `${configApi.PATH_API}/3/movie/popular?${configApi.API_KEY}&page=${page}&language=${configApi.LANGUAGE}`,
  )
    .then(response => {
      return response !== null ? response.json() : [];
    })
    .catch(error => {
      console.error(error);
    });
}

export default GetMoviesPopular;
