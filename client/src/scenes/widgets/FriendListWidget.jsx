import { Box, Typography, useTheme } from "@mui/icons-material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import state, { setFriends } from "state";

const FriendListWidget = () => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${userId}friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`},
            }
        );
        const data = await response.json();
        dispatch(setFriends({friends: data}));
    };

    useEffect(() => {
        getFriends();
    },[]); 

    return (
        <WidgetWrapper>
            <Typography color={palette.neutral.dark} variant="h5" fontweight="500" Friends sx={{ mb: "1.5rem"}}>Friend List </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend key={friend._id} 
                    friendID={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.occupation}
                    userPicturePath={friend.picturePath} />
                ))}
                </Box>
        </WidgetWrapper>
    );
};