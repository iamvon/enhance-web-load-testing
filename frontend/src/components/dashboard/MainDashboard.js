import RequestHistory from './server_logs/RequestHistory'

const MainDashboard = () => {
  return (
    <>
      <div className="relative bg-gray-100">
          <RequestHistory />
      </div>
    </>
  )
}

export default MainDashboard