const OutputPanel = ({ output, isRunning }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 bg-[#343a40] border-b border-gray-700">
        <h3 className="text-sm font-medium text-white">Output</h3>
        {isRunning && (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-300">Running...</span>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 overflow-auto font-mono text-sm bg-[#343a40] text-gray-200">
        {output ? (
          <pre className="whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Run your code to see the output here</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputPanel

