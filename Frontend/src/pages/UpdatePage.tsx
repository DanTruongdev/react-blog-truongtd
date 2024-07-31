import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import BlogCreateEdit from '../components/BlogCreateEdit'
import { Blog } from '../models/Blog'
import apiClient from '../api/http-common'
import useBlogStore from '../store/store'

const UpdatePage: React.FC = () => {
  const [blog, setBlog] = useState<Blog>()
  const currentId = useBlogStore((state) => state.blogId)
  useEffect(() => {
    apiClient.get(`/blog/${currentId}`).then((response) => {
      console.log(response.data)
      setBlog(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <div>
      <Layout>
        <BlogCreateEdit data={blog}/>
      </Layout>
    </div>
  )
}

export default UpdatePage
