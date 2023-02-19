import * as React from 'react'
import {Redirect} from 'react-router'
import {savePost} from './api'

function Editor({user}) {
  const [error, setError] = React.useState(null)
  const [isSaving, setIsSaving] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)

    const {title, content, tags} = e.target.elements
    savePost({
      authorId: user.id,
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map((tag) => tag.trim()),
      createdAt: new Date(),
    }).then(
      () => {
        setRedirect(true)
      },
      (response) => {
        setError(response.data.error)
        setIsSaving(false)
      },
    )
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" type="text" />

      <label htmlFor="content-input">Content</label>
      <input id="content-input" name="content" type="text" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" name="tags" type="text" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
      {error && <div role="alert">{error}</div>}
    </form>
  )
}

export {Editor}
