import React, { useEffect, useState } from 'react'
import { Blog } from '../models/Blog'
import formatDate from '../utils/formatDate'
import { Modal, Button } from 'react-bootstrap'
import apiClient from '../api/http-common'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useBlogStore from '../store/store'
import { useNavigate } from 'react-router-dom'

interface BlogProps {
  children?: React.ReactNode
}

const BlogList: React.FC<BlogProps> = ({ children }) => {
  const [isShowModel, setIsShowModel] = useState<boolean>(false)
  const [blogId, setBlogId] = useState<string>('')
  const [blogList, setBlogList] = useState<Blog[]>([])
  const setBlogIdData = useBlogStore((state) => state.setBlogId)
  const navigate = useNavigate()

  const onToggleModel = () => {
    setIsShowModel(!isShowModel)
  }

  const onRemoveBlog = (id: string) => {
    apiClient
      .delete(`/blog/remove/${blogId}`)
      .then((res) => {
        console.log(res.data)
        const blogListUpdated = blogList.filter((blog) => blog.id !== id)
        setBlogList(blogListUpdated)
        toast.success('Remove blog successfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
      .catch((err) => {
        console.error(err)
        toast.error('Failed to remove blog', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      })
  }

  const onHandleUpdate = (blogId: string) => {
    setBlogIdData(blogId)
    navigate('/update')
  }
  useEffect(() => {
    apiClient
      .get<Blog[]>('/blog')
      .then((res) => {
        const blogList: Blog[] = res.data
        setBlogList(blogList)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <div>
      <Modal show={isShowModel} onHide={onToggleModel}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You cannot restore this blog after removing</Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              onToggleModel()
              onRemoveBlog(blogId)
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={() => onToggleModel()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {children}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">All blogs</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing={0}
            >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Public</th>
                  <th>Location</th>
                  <th>Image</th>
                  <th>Public Date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {blogList.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td>{blog.category.name}</td>
                    <td>{blog.isPublic ? 'Yes' : 'No'}</td>
                    <td>{blog.location.name}</td>
                    <td className="text-center">
                      <img src={blog.image} alt={blog.title} width="80px" />
                    </td>
                    <td>{formatDate(blog.publicDate)}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => onHandleUpdate(blog.id!)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          setBlogId(blog.id!)
                          onToggleModel()
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default BlogList
