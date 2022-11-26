// event.preventDefault()
        // const form = event.target
        // const name = form.name.value;
        // const userImg = form.userImg.value
        // const location = form.location.value
        // const phonenum = form.phonenum.value 
        // const productName = form.productName.value 
        // const category = form.category.value 
        // const productImg = form.productImg.value 
        // const condition = form.condition.value
        // const purchaseYear = form.purchaseYear.value
        // const usedYear = form.usedYear.value 
        // const originalPrice = form.originalPrice.value 
        // const resalePrice = form.resalePrice.value 
        // const description = form.description.value
        // const date = format(setDate,'PP')
        // console.log(productImg)
        // const formData = new FormData()
        // console.log(formData.append('image', productImg))


{/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input name='name' type="text" defaultValue={user?.displayName} disabled placeholder='Full Name' className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="text" defaultValue={user?.email} disabled placeholder="email" className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Photo URL</span>
                                </label>
                                <input name='userImg' type="text" defaultValue={user?.photoURL} disabled placeholder="user photo url" className="input input-bordered" />

                            </div> */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input {...register("phoneNum", { required: "Name is required" })} name='phonenum' type="text" placeholder="+880" className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input {...register("location", { required: "Name is required" })} name='location' type="text" placeholder="city" className="input input-bordered" />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input {...register("productName", { required: "Name is required" })} name='productName'  type="text" placeholder="Detailed Product Name" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Product Category</span>
                                </label>
                                <select {...register("category", { required: "Name is required" })} name='category'  className='select select-ghost w-full bg-white'>
                                    <option disabled selected>select an option</option>
                                    <option value='Apple'>Apple</option>
                                    <option value='Android'>Android</option>
                                    <option value='Google'>Google</option>
                                </select>
                            </div>
                            {/* <div  className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Image</span>
                                </label>
                                <input  name='productImg' type="file"  className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Product Condition</span>
                                </label>
                                <select name='condition'  className='select select-ghost w-full bg-white'>
                                    <option disabled selected>Select An option</option>
                                    <option value='Excellent'>Excellent</option>
                                    <option value='Good'>Good</option>
                                    <option value='Fair'>Fair</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Year Of Purchase</span>
                                </label>
                                <input  name='purchaseYear' type="text" placeholder="Product Purchase Year" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Year Of Product Use</span>
                                </label>
                                <input name='usedYear'  type="text" placeholder="Year Of Use" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Original Price</span>
                                </label>
                                <input name='originalPrice'  type="text" placeholder="Original Price" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Resale Price</span>
                                </label>
                                <input name='resalePrice' type="text" placeholder="Your Asking Price" className="input input-bordered" />
                            </div>

                            <div className="form-control mt-3 w-full">
                                <label className="label">
                                    <span className="label-text">Product Description</span>
                                </label>
                                <textarea name='description' className="textarea textarea-bordered" placeholder="Product Details"></textarea>
                            </div> */}
                            <input type="submit" className='btn btn-primary' value='add' />