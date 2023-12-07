import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material'

interface Props {
  trends: { id: string; trend: string }[]
  value: string
  onChange: (e: SelectChangeEvent) => void
}

const SortingOptionsMenu = ({ trends, value, onChange }: Props) => {
  return (
    <FormControl variant="standard" sx={{ mx: 2, minWidth: 160 }}>
      <InputLabel id="sorting-options-select-label">
        Sort books by title
      </InputLabel>
      <Select
        labelId="sorting-options-select-label"
        id="sorting-options-select"
        value={value}
        onChange={onChange}
        label="Sorting option"
      >
        <MenuItem value={''}>None</MenuItem>
        {trends
          ? trends.map((item: { id: string; trend: string }) => (
              <MenuItem key={item.id} value={item.id}>
                {item.trend}
              </MenuItem>
            ))
          : null}
      </Select>
    </FormControl>
  )
}

export default SortingOptionsMenu
