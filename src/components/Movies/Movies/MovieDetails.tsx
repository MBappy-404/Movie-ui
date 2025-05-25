            {(() => {
              const discount = movieDetails?.data?.discount;
              const price = movieDetails?.data?.price;

              if (!discount || !price) return null;

              const today = new Date();
              const startDate = new Date(discount.startDate);
              const endDate = new Date(discount.endDate);

              today.setHours(0, 0, 0, 0);
              startDate.setHours(0, 0, 0, 0);
              endDate.setHours(0, 0, 0, 0);

              const isDiscountActive =
                today.getTime() === startDate.getTime()   
                today.getTime() === endDate.getTime()  
                today.getTime() < endDate.getTime();        

              return (
                <>
                  {isDiscountActive && (
                    <p className="text-sm md:text-lg text-gray-400">
                      Discount Left:
                      <span className="text-white ml-1">
                        {discount.endDate?.slice(0, 10)}
                      </span>
                    </p>
                  )}

                  <p className="text-sm md:text-lg font-semibold text-gray-400">
                    One Time Purchase:
                    <span className="text-white font-bold ml-2 text-xl">
                      ${price}
                    </span>
                  </p>
                </>
              );
            })()}

            <p className="text-sm md:text-lg font-semibold text-gray-400">
              Rental Price:
              <span className="text-white text-xl">
                {" "}
                ${movieDetails?.data?.rentprice}
              </span>
            </p> 