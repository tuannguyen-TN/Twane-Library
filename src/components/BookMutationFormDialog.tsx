import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'

import { BookMutationOptions } from '../types/BookMutationOptions'
import { Book } from '../types/Book'
import CategoryMenu from './CategoryMenu'
import AuthorMenu from './AuthorMenu'
import { useAppSelector } from '../hooks/useAppSelector'
import { StateType } from '../redux/store/store'

interface Props {
  book: Book
  disabled: boolean
  action: string
  onSubmit: any
}

const BookMutationFormDialog = ({
  book,
  disabled,
  action,
  onSubmit,
}: Props) => {
  const { authorizedToken } = useAppSelector(
    (state: StateType) => state.userReducer
  )

  const [open, setOpen] = useState<boolean>(false)
  const { _id, ...restOfBook } = book
  const [category, setCategory] = useState<string>('')
  const [author, setAuthor] = useState<string[]>([])
  const [bookInfo, setBookInfo] = useState<BookMutationOptions>(
    action === 'Update'
      ? {
          ...restOfBook,
          author: restOfBook.author.reduce((acc: string[], curr) => {
            acc.push(curr._id as string)
            return acc
          }, []),
          category: restOfBook.category.reduce((acc: string[], curr) => {
            acc.push(curr._id)
            return acc
          }, []),
        }
      : {
          ISBN: '',
          title: '',
          edition: '',
          category: [],
          description: '',
          publisher: '',
          author: [],
          img: '',
        }
  )

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = () => {
    if (authorizedToken) {
      if (action === 'Create') {
        onSubmit({ newBook: bookInfo, token: authorizedToken.accessToken })
          .unwrap()
          .then(() => toast.success('New book created successfully!'))
          .catch(() => toast.error('New book created unsuccessfully!'))
      } else {
        onSubmit({
          _id,
          ...bookInfo,
          category: bookInfo.category.toString(),
          token: authorizedToken.accessToken,
        })
          .unwrap()
          .then(() => toast.success('Book updated successfully!'))
          .catch(() => toast.error('Book updated unsuccessfully!'))
      }
    }
    setOpen(false)
  }

  return (
    <div>
      {action === 'Update' && (
        <Button size="small" onClick={handleClickOpen} disabled={disabled}>
          <EditIcon />
        </Button>
      )}
      {action === 'Create' && (
        <Button
          variant="contained"
          onClick={handleClickOpen}
          disabled={disabled}
        >
          {action} a book
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{action} book</DialogTitle>
        <DialogContent>
          <TextField
            id="book-title"
            label="Book title"
            type="text"
            fullWidth
            variant="standard"
            value={bookInfo.title}
            onChange={(e) =>
              setBookInfo({ ...bookInfo, title: e.target.value })
            }
          />
          <TextField
            id="book-isbn"
            label="ISBN"
            type="text"
            fullWidth
            variant="standard"
            value={bookInfo.ISBN}
            onChange={(e) => setBookInfo({ ...bookInfo, ISBN: e.target.value })}
          />
          <AuthorMenu
            isMultiple={true}
            containsNone={false}
            value={author}
            onChange={(e: SelectChangeEvent<string | string[]>) => {
              setAuthor(e.target.value as string[])
              setBookInfo({
                ...bookInfo,
                author: (e.target.value as string[]).reduce(
                  (acc: string[], curr) => {
                    acc.push(curr.split('  ')[0])
                    return acc
                  },
                  []
                ),
              })
            }}
          />
          <TextField
            id="book-edition"
            label="Edition"
            type="text"
            fullWidth
            variant="standard"
            value={bookInfo.edition}
            onChange={(e) =>
              setBookInfo({ ...bookInfo, edition: e.target.value })
            }
          />
          <TextField
            id="book-publisher"
            label="Publisher"
            type="text"
            fullWidth
            variant="standard"
            value={bookInfo.publisher}
            onChange={(e) =>
              setBookInfo({ ...bookInfo, publisher: e.target.value })
            }
          />
          <TextField
            id="book-description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={bookInfo.description}
            onChange={(e) =>
              setBookInfo({ ...bookInfo, description: e.target.value })
            }
          />
          <CategoryMenu
            containsNone={false}
            value={category}
            onChange={(e: SelectChangeEvent) => {
              setCategory(e.target.value)
              setBookInfo({
                ...bookInfo,
                category: [e.target.value.split(' ')[0]],
              })
            }}
          />
          <TextField
            id="product-image"
            label="Image link"
            type="text"
            fullWidth
            variant="standard"
            value={bookInfo.img}
            onChange={(e) =>
              setBookInfo({
                ...bookInfo,
                img: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{action}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default BookMutationFormDialog
