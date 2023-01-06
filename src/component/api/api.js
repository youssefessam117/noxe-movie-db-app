import axios from "axios";

export let getTrending = async (mediaTypy) => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/${mediaTypy}/day?api_key=3a8d4bff99757bb1b549c063f2ed3401`
  );
  return data.results;
};

export let movieTvApi = async (mediaTypy, genre) => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/${mediaTypy}/${genre}?api_key=3a8d4bff99757bb1b549c063f2ed3401&language=en-US&page=1`
  );
  return data.results;
};
export let getRecommendations = async (mediaTypy, id) => {
  let { data } = await axios.get(
    `https://api.themoviedb.org/3/${mediaTypy}/${id}/recommendations?api_key=3a8d4bff99757bb1b549c063f2ed3401&language=en-US&page=1`
  );
  return data.results;
};

