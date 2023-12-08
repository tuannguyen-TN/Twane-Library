import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material'

import { Category } from '../types/Category'
import { useAuthorsCategoriesContext } from '../hooks/useAuthorsCategoriesContext'

interface Props {
  containsNone: boolean
  value: string
  onChange: (e: SelectChangeEvent) => void
}

const CategoryMenu = ({ containsNone, value, onChange }: Props) => {
  const { categories } = useAuthorsCategoriesContext()

  return (
    <FormControl variant="standard" sx={{ minWidth: 100 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={value}
        onChange={onChange}
        label="Category"
      >
        {containsNone && (
          <MenuItem value="">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>None</Typography>
            </Stack>
          </MenuItem>
        )}
        {categories
          ? categories.map((category: Category) => (
              <MenuItem
                key={category._id}
                value={category._id + ' ' + category.name}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>{category.name}</Typography>
                </Stack>
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  )
}

export default CategoryMenu
