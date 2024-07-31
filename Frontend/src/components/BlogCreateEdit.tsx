import React, { useEffect, useState } from 'react'
import { Category } from '../models/Category'
import { Location } from '../models/Location'
import apiClient from '../api/http-common'
import formatDate from '../utils/formatDate'
import { Blog } from '../models/Blog'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type BlogForm = Omit<Blog, 'category' | 'location' | 'image'> & {
  uploadImage?: File
  categoryId: string
  locationId: string
}

type Props = {
  data?: Blog
}

const BlogCreateEdit: React.FC<Props> = ({ data }) => {
  const [categoryList, setCategoryList] = useState<Category[]>()
  const [locationList, setLocationList] = useState<Location[]>()
  const [blogTitle, setBlogTitle] = useState<string>('')
  const [blogShortDescription, setBlogShortDescription] = useState<string>('')
  const [blogContent, setBlogContent] = useState<string>('')
  const [locationId, setLocationId] = useState<string>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [blogImage, setBlogImage] = useState<File>()
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [publicDate, setPublicDate] = useState<string>(
    formatDate(new Date().toDateString())
  )

  useEffect(() => {
    apiClient
      .get<Category[]>('/category')
      .then((res) => {
        const categories: Category[] = res.data
        setCategoryId(categories?.[0].id ?? '')
        setCategoryList(categories)
      })
      .catch((err) => {
        console.error(err)
      })
    apiClient
      .get('/location')
      .then((res) => {
        const locations: Location[] = res.data
        setLocationId(locations?.[0].id ?? '')
        setLocationList(locations)
      })
      .catch((err) => console.log(err))
  }, [])

  const createNewBlog = (): void => {
    var formData = new FormData()
    formData.append('title', blogTitle)
    formData.append('shortDescription', blogShortDescription ?? '')
    formData.append('content', blogContent)
    formData.append('locationId', locationId)
    formData.append('categoryId', categoryId)
    formData.append('isPublic', isPublic.toString())
    formData.append('publicDate', publicDate ?? '')
    if (blogImage) {
      formData.append('image', blogImage)
    }
    apiClient
      .post('/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        toast.success('Create new blog successfully', {
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
        console.log(err)
        toast.error('Failed to create blog!', {
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

  return (
    <div className="card shadow m-4">
      <div className="card-header py-3">
        <h3 className="m-0 font-weight-bold text-primary">
          {data ? 'Update' : 'Add new'} blog
        </h3>
      </div>
      <div className="card-body">
        <form id="blog-form" method="post" encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Title:</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter title here..."
              value={data?.title}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
            <span className="text-danger" asp-validation-for="Title" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Short Description:</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter short description here..."
              value={data?.shortDescription}
              onChange={(e) => setBlogShortDescription(e.target.value)}
            />
            <span
              className="text-danger"
              asp-validation-for="ShortDescription"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Content:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              defaultValue={''}
              value={data?.content}
              onChange={(e) => setBlogContent(e.target.value)}
            />
            <span className="text-danger" asp-validation-for="Content" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Image:</label>
            <div className="row-cols-4">
              <input
                type="file"
                className="form-control"
                id="exampleFormControlInput1"
                onChange={(e) => setBlogImage(e.target?.files?.[0])}
              />
            </div>
          </div>
          <div className="form-group d-flex justify-content-start">
            <label>Location:</label> <br />
            {locationList?.map((location, index) => (
              <div
                className="form-check"
                style={{ marginLeft: '15px' }}
                key={location.id}
              >
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value={location.id}
                  defaultChecked={index === 0}
                  checked={data?.location.id === location.id}
                  onChange={(e) => setLocationId(e.target.value)}
                />
                <label className="form-check-label">{location.name}</label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Public:</label> <br />
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={data?.isPublic}
                  onChange={(e) => setIsPublic(true)}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  onChange={(e) => setIsPublic(false)}
                  checked={!data?.isPublic}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col">
              <div className="col-4">
                <label htmlFor="exampleFormControlInput1">Category:</label>{' '}
                <br />
                <select
                  className="form-control"
                  aria-label=".form-select-lg example"
                  value={data?.category.id}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categoryList?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="col-5">
                <label htmlFor="exampleFormControlInput1">Public Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={
                    data?.publicDate ? formatDate(data?.publicDate) : publicDate
                  }
                  onChange={(e) => setPublicDate(e.target.value)}
                />
                <span
                  className="text-danger"
                  asp-validation-for="PublictDate"
                />
              </div>
            </div>
          </div>
          <hr className="sidebar-divider" />
          <div className="container d-flex justify-content-center">
            <div className="d-flex gap-2">
              <input
                type="button"
                defaultValue="Create"
                className="btn btn-success mr-3"
                onClick={() => createNewBlog()}
              />

              <input
                type="button"
                defaultValue="Clear"
                className="btn btn-primary"
              />
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}
export default BlogCreateEdit
