import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlinedOutlined,
} from "@mui/icons-material";
import { Box, Divider, useTheme, Typography } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const UserWidget = ({userId, picturePath}) => {
    const [user, setUser] = useState(null);
    const { palette } = useTheme();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}`},
            method: "GET",
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return null;
    }
    const { firstName, lastName, location, occupation, viewedProfile, impressions, friends, } = user; 

    return (
        <WidgetWrapper>
        {/*/first */}
            <FlexBetween gap="0,5rem" pb="1.1rem" onClick={() => navigate(`/profile/${userId}`)}>
            <FlexBetween>
                <UserImage image={picturePath} />
                <Box>
                    <Typography variant="h4" color={dark} fontWeight="500" sx={{"&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                    },
                    }}> {firstName} {lastName}</Typography>
                    <Typography color={medium}>{friends.length}friends</Typography>
                </Box>
            </FlexBetween>
            <ManageAccountsOutlined/>
            </FlexBetween>

            <Divider />
            {/*second */}

            <Box p="1rem">
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main}}/>
            <Typography color={medium}>{location}</Typography>
            <WorkOutlinedOutlined fontSize="larg" sx={{ color: main}}/>
            <Typography color={medium}>{occupation}</Typography>
            </Box>
            </Box>

            <Divider/>
            {/*third */}

            <Box p="1rem">
             <FlexBetween mb="0.5rem">
                <Typography color={medium}>Who has view your profile</Typography>
                <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween>
                <Typography color={medium}>Post impressions</Typography>
                <Typography color={main} fontWeight="500">{impressions}</Typography>
                </FlexBetween>
            </Box>

            <Divider/>

            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">Social Profiles</Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                <FlexBetween gap="1rem">
                <img src="../assets/twitter.png" alt="twitter"/>
                <Box>
                    <Typography color={main} fontWeight="500">TWITTER
                    </Typography>
                    <Typography color={medium}>Social Network</Typography>
                </Box>
                </FlexBetween>
                <EditOutlined sx={{color:main}}/>
                </FlexBetween>
                
                <FlexBetween gap="1rem">
                <FlexBetween gap="1rem">
                <img src="../assets/linkedin.png" alt="linkedin"/>
                <Box>
                    <Typography color={main} fontWeight="500">LINKEDIN</Typography>
                    <Typography color={medium}>Network Platform</Typography>
                </Box>
                </FlexBetween>
                <EditOutlined sx={{color:main}}/>
                </FlexBetween>
             
            </Box>

        </WidgetWrapper>
    );
};

export default UserWidget;
