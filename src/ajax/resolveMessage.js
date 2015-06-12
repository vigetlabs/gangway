const ERRORS = {
  0   : 'Unable to access service. Please try again or contact support',
  502 : 'Unable to complete request. Have you lost your connection to the internet?'
}

export default function(status, fallback) {
  return ERRORS[status] || fallback
}
