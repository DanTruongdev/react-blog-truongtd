import React from 'react'
import Layout from '../layouts/Layout'
import BlogCreateEdit from '../components/BlogCreateEdit'


const NewPage: React.FC = () => {
  return (
    <div>
      <Layout>
        <BlogCreateEdit/>
      </Layout>
    </div>
  )
}

export default NewPage
