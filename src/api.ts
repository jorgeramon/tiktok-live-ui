import { IRequest } from '@/interfaces/request';

const api_url: string = import.meta.env.VITE_API;

export async function getRequests(account_id: string): Promise<IRequest[]> {
  try {
    const request = await fetch(`${api_url}/tiktok/${account_id}/requests`);
    const response = await request.json();
    return response.data as IRequest[];
  } catch (err) {
    return [];
  }
}

export async function getStatus(account_id: string): Promise<boolean> {
  try {
    const request = await fetch(`${api_url}/tiktok/${account_id}/status`);
    const response = await request.json();
    return response.data as boolean;
  } catch (err) {
    return false;
  }
}

export async function completeRequest(
  account_id: string,
  request_id: string
): Promise<IRequest> {
  try {
    const request = await fetch(
      `${api_url}/tiktok/${account_id}/requests/${request_id}`,
      {
        method: 'PUT',
      }
    );
    const response = await request.json();
    return response.data as IRequest;
  } catch (err) {
    throw err;
  }
}
