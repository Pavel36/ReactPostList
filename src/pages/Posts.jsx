import React, {useState, useMemo, useEffect} from 'react';
import PostList from '../components/PostList'
import MyButton from '../components/UI/button/MyButton'; 
import PostForm from '../components/PostForm'
import PostFilter from '../components/PostFilter'
import MyModal from '../components/MyModal/MyModal'
import {usePosts} from '../hooks/usePosts'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import {useFetching} from '../hooks/useFetching'
import {getPageCont} from '../utils/pages'
import Pagination from '../components/UI/pagination/Pagination'
import '../styles/App.css'


function Posts() {
  const [posts, setPosts] = useState([])

  const [filter, setFilter] = useState({sort:'', query:''})
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setlimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page)=>{
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCont(totalCount, limit))
  })

  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
  
  useEffect(() => {
    fetchPosts(limit, page)
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }


  const removePost = (post) => {
    setPosts(posts.filter(p=> p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop:30}} onClick={()=>setModal(true)}>
        Create Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}>
      </hr>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError && <h1>Error ${postError}</h1> }
      {isPostsLoading 
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 150}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchPosts} title='Post list'/>
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
      
    </div>
  );
}

export default Posts;
