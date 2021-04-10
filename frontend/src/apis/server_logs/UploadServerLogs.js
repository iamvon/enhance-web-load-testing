import API from '../api'

const UploadServerLogs = async(file) => {
    if (!file)
        return null;     

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    
    const res = await API.post(`logs/upload`, uploadFormData);
    return res;
}

export default UploadServerLogs