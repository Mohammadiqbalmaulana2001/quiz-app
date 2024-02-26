const getTriviaData = async () => {
    try {
        const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple")
        const data = await res.json();
        // console.log(data.results)
        data.results
      } catch (error) {
        console.error(error)
      }
}

export default getTriviaData;