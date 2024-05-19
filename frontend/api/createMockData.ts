import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createMockData = async (): Promise<void> => {
    await axios.post(`${API_URL}/create_mock_data/generate-mock-data`);
};

