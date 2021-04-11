import API from '../api'

const UploadServerLogs = async(file) => {
    if (!file)
        return null;     

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    
    const data = await API.post(`logs/upload`, uploadFormData);
    return data;
}

export default UploadServerLogs