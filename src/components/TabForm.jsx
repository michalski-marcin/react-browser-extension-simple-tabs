function TabForm({  inputTitle, inputComment, setInputTitle, setInputComment, saveTab, }) {
    return (
        <>
        <div className="font-outfit text-4xl font-bold p-2 mb-2 flex justify-between items-center">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#295FA6] to-[#BF2424] max-w-[230px]">TabMemo</p>
          <button onClick={saveTab} id='save-btn' className="relative border-[1px] rounded-md shadow-sm hover:shadow-lg border-[#295FA6] bg-[#174873] hover:bg-[#295FA6] text-sm text-[#F2F2F2] font-bold py-2 w-[130px] hover:border-[#174873] hover:scale-[1.01] transition duration-200">
          Add Tab
        </button>
        </div>
        <input className="input-tailw"
          type='text'
          id='input-title'
          placeholder='custom title'
          maxLength='35'
          required
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <input className="input-tailw mb-10"
          type='text'
          id='input-comment'
          placeholder='additional comment'
          maxLength='150'
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />

        
        </>
    )
}

export default TabForm;