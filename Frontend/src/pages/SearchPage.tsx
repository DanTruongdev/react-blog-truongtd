import React, { useState } from 'react'
import Layout from '../layouts/Layout'
import BlogList from '../components/BlogList'
import BlogSearchForm from '../components/BlogSearchForm'
import { Blog } from '../models/Blog'

const SearchPage: React.FC = () => {

  return (
    <Layout>
      <BlogList>
        <BlogSearchForm />
      </BlogList>
    </Layout>
  )
}
export default SearchPage
