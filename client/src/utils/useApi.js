
const useApi = () => {
  
  const fetchIt = async (url) => {
    const resp = await fetch(url)
    const result = await resp.json()
    return result
  }

  const mockFetch = async (url) => {
    setTimeout(() => {
      return Promise.resolve({data: "blah blah blah"})
    }, 2000)
  }


  return {
    fetchIt,
    mockFetch
  }
}

export default useApi