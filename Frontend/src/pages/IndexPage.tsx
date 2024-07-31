import React, { useEffect, useState } from 'react'
import Layout from '../layouts/Layout'
import BlogList from '../components/BlogList'
import { Blog } from '../models/Blog'
import apiClient from './../api/http-common'


const IndexPage: React.FC = () => {
  

  return (
    <div>
      <Layout>
        <BlogList/>
      </Layout>
    </div>
  )
}

export default IndexPage
