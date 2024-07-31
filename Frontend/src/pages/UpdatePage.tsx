import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import BlogCreateEdit from '../components/BlogCreateEdit'
import { Blog } from '../models/Blog'
import apiClient from '../api/http-common'
import useBlogStore from '../hooks/store'

const UpdatePage: React.FC = () => {
  const [blog, setBlog] = useState<Blog>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentId, setCurrentId] = useState<string>(
    useBlogStore((state) => state.blogId!)
  )

  useEffect(() => {
    apiClient
      .get(`/blog/${currentId}`)
      .then((response) => {
        setBlog(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <Layout>
        <BlogCreateEdit data={blog} />
      </Layout>
    </div>
  )
}

export default UpdatePage
