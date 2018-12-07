export default function reducer(state = {}, action) {
    if (action.type == "RECEIVE_FRIENDS_WANNABES") {
        return {
            ...state,
            friendsAndWannabes: action.friendsAndWannabes
        };
    }

    if (action.type == "ACCEPT_FRIEND_REQUEST") {
        //new state object that has all the same object as the old state
        //same thing we did in hotornot!
        //hardest part of working with redux is this!
        return {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map(user => {
                if (user.id == action.acceptfriend) {
                    user["accepted"] = true;
                    return user;
                } else {
                    return user;
                }
            })
        };
    }

    if (action.type == "UNFRIEND") {
        return {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.filter(
                user => user.id != action.deletefriend
            )
            //we need to use the filter here so we don't get the id of the
        };
    }

    return state;
}
