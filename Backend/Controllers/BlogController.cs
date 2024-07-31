using BlogOnline.Models.DTOs.Requests;
using BlogOnline.Models.DTOs.Responses;
using BlogOnline.Models.Entities;
using BlogOnline.Services;
using BlogOnline.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BlogOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;
        private readonly ILocationService _locationService;
        private readonly ICategoryService _categoryService;

        public BlogController(IBlogService blogService, ILocationService locationService, ICategoryService categoryService)
        {
            _blogService = blogService;
            _locationService = locationService;
            _categoryService = categoryService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBlogs()
        {
            var blogList = await _blogService.GetAllBlogsAsync();
            if (!blogList.Any()) return Ok(new List<Blog>());
            return Ok(blogList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBlogById([FromRoute]Guid id)
        {
            var blog = await _blogService.GetBlogByIdAsync(id);
            return Ok(blog);
        }
        //[HttpGet]
        //public async Task<IActionResult> CreateBlog()
        //{
        //    var locationList = await _locationService.GetAllLocationAsync();
        //    var categoryList = await _categoryService.GetAllCategoryAsync();
        //    return ;
        //}

        [HttpPost("add")]
        public async Task<IActionResult> CreateBlog([FromForm] BlogDto form)
        {
            try
            {
                var result = await _blogService.AddBlogAsync(form);
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response("Error", e.Message));
            }
        }
        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemoveBlog([FromRoute] Guid id)
        {
            try
            {
                var result = await _blogService.RemoveBlogAsync(id);
                return NoContent();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response("Error", e.Message));
            }
        }


        //[HttpGet]
        //public async Task<IActionResult> UpdateBlog(Guid id)
        //{
        //    var blog = await _blogService.GetBlogByIdAsync(id);
        //    if (blog == null) return RedirectToAction(nameof(Index));
        //    var locationList = await _locationService.GetAllLocationAsync();
        //    var categoryList = await _categoryService.GetAllCategoryAsync();
        //    ViewBag.LocationList = locationList;
        //    ViewBag.CategoryList = categoryList;
        //    ViewBag.Blog = blog;
        //    return View();
        //}


        [HttpPut("update")]
        public async Task<IActionResult> UpdateBlog([FromBody] BlogDto form)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Response("Error", ModelState.ToString()));

            }
            var result = await _blogService.UpdateBlogAsync(form);
            if (!result) return StatusCode(StatusCodes.Status500InternalServerError, new Response("Error", "An error occurs during update blog"));
            return Ok(new Response("Succes", "Update blog successfully"));
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchBlog([FromQuery]string? searchString)
        {
            if (searchString.IsNullOrEmpty()) return Ok(new List<Blog>());
            var searchResult = await _blogService.SearchBlogAsync(searchString);
            return Ok(searchResult);
        }
    }
}