const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwODI0ZDI1NC0xYWI1LTRjZjItYjhhMi04MmQ0NTZiNDcxY2UiLCJlbWFpbCI6ImJlemF3YWRhYmhhbnViYWxhamkzMDE4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiOWI5NmU4YmJiM2Y0ODYwNzY0ZSIsInNjb3BlZEtleVNlY3JldCI6IjcxYWRkMTRlYjE0ODIyYmNlMmZhZmEwYmRlOGY5Y2VkYTJiZTllYjE5NWZkYTIxNDBjYjlkZjcxZmNlY2Y3NTMiLCJpYXQiOjE3MjE4MDI1ODB9.MnF7cnrKwci8kGKkgSOH1g7IRI2uYrNY3haT6fUAcU8";

const pinFileToIPFS = async (src) => {
    const formData = new FormData();
    const file = fs.createReadStream(src);
    formData.append('file', file);

    const pinataMetadata = JSON.stringify({
        name: 'File',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: -1,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });

        const ipfsUrl = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;

        return ipfsUrl;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = pinFileToIPFS;
