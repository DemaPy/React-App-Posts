import React, { useState, useEffect, useRef } from "react";
import { useFetching} from "../hooks/useFetching";
import Pagination from "../components/UI/pagination/Pagination";
import MyButton from "../components/UI/button/mybutton";
import MyModal from "../components/UI/modal/MyModal";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostService from "../API/PostService";
import {usePosts} from "../hooks/usePosts";
import {getPageCount} from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import { MySelect } from "../components/UI/select/MySelect";


function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query)
  const lastElement = useRef()

  const [fetchPosts, isPostsLoading, postError] = useFetching( async() => {
    const response = await PostService.getAll(limit, page)
    setPosts([...posts, ...response.data])
    const totalCount =  response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  return (
    <div className='App'>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>

      <PostFilter filter={filter}setFilter={setFilter}/>
      <MySelect
        value={limit}
        onChange={value => setLimit(value)}
        defaultValue='Amount of posts' 
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 20, name: '20'},
          {value: -1, name: '???????????????? ??????'},
        ]}
      />
      <hr style={{margin: '15px 0'}}></hr>
      {postError && <h1>?????????????????? ???????????? {postError}</h1>}

      <PostList remove={removePost} posts={sortedAndSearchPosts} title="?????????? ?????? JS"/>
      <div ref={lastElement} style={{height: 20, background: 'red'}}></div>

      {isPostsLoading &&
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
      }
      

      <MyButton style={{marginTop: '50px', display: 'flex-end'}} onClick={() => setModal(true)}>?????????????? ????????</MyButton>
      <hr style={{margin: '15px 0'}}></hr>
      <Pagination
        page={page} 
        changePage={changePage} 
        totalPages={totalPages}
      />
    </div>
  );
}

export default Posts;
