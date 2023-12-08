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
  isMultiple: boolean
  containsNone: boolean
  value: string | string[]
  onChange: (e: SelectChangeEvent<string | string[]>) => void
}

const CategoryMenu = ({ isMultiple, containsNone, value, onChange }: Props) => {
  const categories = useCategoriesContext()

  return (
    <FormControl variant="standard" sx={{ minWidth: 100 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        multiple={isMultiple}
        value={isMultiple ? (value as string[]) : (value as string)}
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
                // value={category.name}
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
