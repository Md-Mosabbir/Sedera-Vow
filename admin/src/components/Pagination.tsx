type PaginationProps = {
  page: number

  totalPages: number
  setLimits: (limit: number) => void
  updateParams: (param: string, value: string) => void
}

const Pagination = ({
  page,
  totalPages,

  setLimits,
  updateParams,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="join">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn ${page === i + 1 ? "btn-primary" : "btn-secondary"}`}
              onClick={() => updateParams("page", (i + 1).toString())}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <select
        className="select w-full max-w-xs "
        onChange={(e) => setLimits(parseInt(e.target.value))}
      >
        <option defaultValue={"10"}>10</option>
        <option>20</option>
        <option>30</option>
      </select>
    </div>
  )
}

export default Pagination
