import axios from "axios";

const fetchShow = async () => {
  const response = await axios.get(
    "https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes"
  );

  return response.data;
};

export default fetchShow;
