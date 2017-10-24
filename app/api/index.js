var API_URL = 'https://pure-island-32874.herokuapp.com/v1';//'http://localhost:3001/v1'; https://pure-island-32874.herokuapp.com

//TODO: add the tags fields, latitude and lognitude 
exports.EVENT_FEED = (lon, lat, userId) =>`${API_URL}/geteventsbylocation/${lon}/${lat}/${userId}`;
exports.CREATE_EVENT = (user_id) => `${API_URL}/addevent/${user_id}/new`;
exports.SIGNIN_URL = `${API_URL}/signin`;
exports.SIGNUP_URL = `${API_URL}/signup`;
exports.GOOGLE_MAP_API = (address) => `https://maps.googleapis.com/maps/api/geocode/json?&address=${address}`;
exports.GET_USER_PROFILE = (user_id) => `${API_URL}/getprofile/${user_id}`;;
exports.GOING_TO_EVENT = (user_id,event_id) => `${API_URL}/goingInEvent/${user_id}/${event_id}`;;
exports.INTRESTED_IN_EVENT = (user_id,event_id) => `${API_URL}/interestedInEvent/${user_id}/${event_id}`;
exports.NOT_GOING_TO_EVENT = (user_id,event_id) => `${API_URL}/notattending/${user_id}/${event_id}`;
exports.SEARCH_EVENT_BY_TAG = (user_id, tags) => `${API_URL}/getEventsByTags/${user_id}/${tags}`;
exports.GET_EVENT_INFO = (event_id) => `${API_URL}/getEventById/${event_id}`;
exports.GET_FOLLOWERS = (user_id) => `${API_URL}/getfollowers/${user_id}/followers/`;
exports.GET_FOLLOWING = (user_id) => `${API_URL}/getfollowing/${user_id}/following/`;
exports.CHANGE_USER_FIRST_NAME = (user_id) => `${API_URL}/useredits/${user_id}/firstname`;
exports.CHANGE_USER_LAST_NAME = (user_id) => `${API_URL}/useredits/${user_id}/lastname`;
exports.CHANGE_USER_MAIL = (user_id) => `${API_URL}/useredits/${user_id}/email`;
exports.CHANGE_PASSWORD = (user_id) => `${API_URL}/useredits/${user_id}/password`;
exports.FIND_PEOPLE = (user_id, paramter) => `${API_URL}/findpeople/${user_id}/${paramter}`;
exports.GET_ALL_HOSTS_EVENTS = (user_id) => `${API_URL}/getMyEvents/${user_id}`;
exports.EVENT_EDIT_TITLE = (event_id) => `${API_URL}/eventedits/${event_id}/title`;
exports.EVENT_EDIT_DESCRIPTION = (event_id) => `${API_URL}/eventedits/${event_id}/description`;
exports.EVENT_EDIT_TAG = (event_id) => `${API_URL}/eventedits/${event_id}/addtags`;
// GET_USER_PROFILE