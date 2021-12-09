import configApi from './configApi/configApi';

async function getMoviesPopular(page = null) {
  console.log(
    `${configApi.PATH_API}/3/movie/popular?${configApi.API_KEY}&page=${page}&language=${configApi.LANGUAGE}`,
  );
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

async function getGenres(page = null) {
  return fetch(
    `${configApi.PATH_API}/3/genre/movie/list?${configApi.API_KEY}&page=${page}&language=${configApi.LANGUAGE}`,
  )
    .then(response => {
      console.log(
        `${configApi.PATH_API}/3/genre/movie/list?${configApi.API_KEY}&page=${page}&language=${configApi.LANGUAGE}`,
      );
      return response !== null ? response.json() : [];
    })
    .catch(error => {
      console.log(error);
    });
}

export {getMoviesPopular, getGenres};
