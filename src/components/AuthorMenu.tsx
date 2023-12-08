import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'

import { Author } from '../types/Author'
import { useAuthorsCategoriesContext } from '../hooks/useAuthorsCategoriesContext'

interface Props {
  isMultiple: boolean
  containsNone: boolean
  value: string | string[]
  onChange: (e: SelectChangeEvent<string | string[]>) => void
}

const AuthorMenu = ({ isMultiple, containsNone, value, onChange }: Props) => {
  const { authors } = useAuthorsCategoriesContext()

  return (
    <FormControl variant="standard" sx={{ minWidth: 100 }}>
      <InputLabel id="author-select-label">Author</InputLabel>
      <Select
        labelId="author-select-label"
        id="author-select"
        multiple={isMultiple}
        value={isMultiple ? (value as string[]) : (value as string)}
        onChange={onChange}
        label="Author"
      >
        {containsNone && (
          <MenuItem value="">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>None</Typography>
            </Stack>
          </MenuItem>
        )}
        {authors
          ? authors.map((author: Author) => (
              <MenuItem
                key={author._id}
                value={
                  author._id + '  ' + author.firstName + ' ' + author.lastName
                }
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>
                    {author.firstName + ' ' + author.lastName}
                  </Typography>
                </Stack>
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  )
}

export default AuthorMenu
