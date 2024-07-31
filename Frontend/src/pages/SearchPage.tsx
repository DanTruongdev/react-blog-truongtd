import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import BlogList from '../components/BlogList'
import BlogSearchForm from '../components/BlogSearchForm'
import { Blog } from '../models/Blog'
import useDebounce from '../hooks/useDebounce'
import apiClient from '../api/http-common'

const SearchPage: React.FC = () => {
  const [searchString, setSearchString] = useState<string>('')
  const [blogList, setBlogList] = useState<Blog[]>([])
  const debouncedValue = useDebounce(searchString.trim())

  const setSearchStringState = (searchString: string): void => {
    setSearchString(searchString)
  }

  useEffect(() => {
    var endpoint: string = `/blog/search?searchString=${debouncedValue}`
    if (!debouncedValue) endpoint = `/blog`
    apiClient
      .get(endpoint)
      .then((res) => {
        console.log('from parent')
        setBlogList(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [debouncedValue])

  return (
    <Layout>
      <BlogList blogs={blogList}>
        <BlogSearchForm setSearchStringState={setSearchStringState} />
      </BlogList>
    </Layout>
  )
}
export default SearchPage
