import { Grid } from '@mui/material';
import React, { useState } from 'react';
import ProfileCard from './ProfileCard';
import { UserState } from '../UserContext';
import ProfileForm from './ProfileForm';

const UserProfile = () => {
  const [isProfile, setIsProfile] = useState(true);

  const { user, userProfile, setUserProfile } = UserState();

    return (
        <Grid container spacing={2} columns={12}>

          <Grid item xs={12} md={12}>
            {isProfile ?
            (
              <ProfileCard setIsProfile={setIsProfile} userProfile={userProfile}/>
            ) : (
              <ProfileForm user={user} setUserProfile={setUserProfile} setIsProfile={setIsProfile} userProfile={userProfile}/>
            )
            }
            
          </Grid>

        </Grid>
    )
  
}

export default UserProfile;