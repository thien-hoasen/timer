export interface Place {
  id: string
  timezone: string
  isPrimary: boolean
}

export const MOCK_PLACES: Place[] = [{
  id: 'US',
  timezone: 'America/New_York',
  isPrimary: true,
}, {
  id: 'VN',
  timezone: 'Asia/Ho_Chi_Minh',
  isPrimary: false,
}, {
  id: 'JP',
  timezone: 'Asia/Tokyo',
  isPrimary: false,
}]

export function getPlaceName(place: Place) {
  return place.timezone.split('/').pop()?.replaceAll('_', ' ')
}
