import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import HomeIcon from '@mui/icons-material/Home'
import PhoneIcon from '@mui/icons-material/Phone'

import { User } from '../types/User'

interface Props {
  data: User
}

const UserCard = ({ data }: Props) => {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        image={data.avatar}
        title="Profile Card"
        component="div"
        sx={{
          pt: '100%',
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="h2" align="center">
          {data.firstName + ' ' + data.lastName}
        </Typography>
        <Typography gutterBottom variant="h6">
          <EmailIcon fontSize="large" /> {data.email}
        </Typography>
        <Typography gutterBottom variant="h6">
          <AssignmentIndIcon fontSize="large" /> {data.role[0].title}
        </Typography>
        <Typography gutterBottom variant="h6">
          <HomeIcon fontSize="large" /> {data.address}
        </Typography>
        <Typography gutterBottom variant="h6">
          <PhoneIcon fontSize="large" /> {data.phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default UserCard
