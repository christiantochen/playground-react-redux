import axios from 'axios';
import { Repository, User, UserDetail } from 'github';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Tab, TabContent, TabItem, TabPane } from '../components/Tab';
import {
    UserFollowList,
    UserRepositoryList,
    UserProfile,
} from '../components/PageUser';
import { RootState } from '../store/configureStore';
import { searchUsers } from '../store/reducers/users';

const UserPage = (): React.ReactElement => {
    const { userLogin } = useParams();
    const Users = useSelector((state: RootState) => state.users);

    const [user, setUser] = useState<UserDetail>();
    const [repos, setRepos] = useState<Repository[]>();
    const [followers, setFollowers] = useState<User[]>();
    const [following, setFollowing] = useState<User[]>();

    const dispatch = useDispatch();

    useEffect(() => {
        const rawUser = Users.items.find((i) => i.login === userLogin);

        // If user does not exist in reducer then fetch the user info
        if (!rawUser) {
            dispatch(searchUsers({ username: userLogin }));
            return;
        }

        // Fetch User Detail
        axios.get(rawUser.url).then(({ data }) => setUser(data));
        // Fetch User Repository
        axios.get(rawUser.repos_url).then(({ data }) => setRepos(data));
        // Fetch User Follower
        axios.get(rawUser.followers_url).then(({ data }) => setFollowers(data));
        // Fetch User Following
        // NOTE: rawUser.followingUrl contain {}, it's being encoded by axios
        // causing the url not found, so this is temporary work around
        axios
            .get(rawUser.url + '/following')
            .then(({ data }) => setFollowing(data));
    }, [Users]);

    // Show loading if fetching process is still on going
    if (!user || !repos || !followers || !following)
        return <div>Loading...</div>;

    const handleClick = (url: string) => {
        window.open(url);
    };

    return (
        <div className="container p-4 flex mx-auto">
            <UserProfile user={user} />
            <div className="flex-grow">
                <Tab>
                    <TabItem
                        id="tabs-repositories-tab"
                        controls="tabs-repositories"
                        selected={true}
                    >
                        Repositories ({repos.length})
                    </TabItem>
                    <TabItem id="tabs-followers-tab" controls="tabs-followers">
                        Followers ({user.followers})
                    </TabItem>
                    <TabItem id="tabs-following-tab" controls="tabs-following">
                        Following ({user.following})
                    </TabItem>
                </Tab>

                <TabContent>
                    <TabPane
                        id="tabs-repositories"
                        labelledby="tabs-repositories-tab"
                        selected={true}
                    >
                        <UserRepositoryList
                            items={repos}
                            onClick={handleClick}
                        />
                    </TabPane>
                    <TabPane
                        id="tabs-followers"
                        labelledby="tabs-followers-tab"
                    >
                        <UserFollowList
                            items={followers}
                            onClick={handleClick}
                        />
                    </TabPane>
                    <TabPane
                        id="tabs-following"
                        labelledby="tabs-following-tab"
                    >
                        <UserFollowList
                            items={following}
                            onClick={handleClick}
                        />
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
};

export default UserPage;
