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
import { useCategoriesContext } from '../hooks/useCategoriesContext'

interface Props {
  value: string
  onChange: (e: SelectChangeEvent) => void
}

const CategoryMenu = ({ value, onChange }: Props) => {
  const categories = useCategoriesContext()

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
        <MenuItem value="">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>None</Typography>
          </Stack>
        </MenuItem>
        {categories
          ? categories.map((category: Category) => (
              <MenuItem key={category._id} value={category.name}>
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
