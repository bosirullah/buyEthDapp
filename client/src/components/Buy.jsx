import {ethers} from "ethers"
import "./Buy.css";
const Buy=({state})=>{

    const EthPay = async(event)=>{
        event.preventDefault();

        const {contract}=state;
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;
        const amt = document.querySelector("#amount").value;

        const amount = {value:ethers.utils.parseEther(amt)}
        const transaction = await contract.payEth(name,message,amount)
        await transaction.wait();

        alert("Transaction is successul");
        window.location.reload();
    }
    
    return  (
        <div className="center">
            <h1>Thanks</h1>
            <form onSubmit={EthPay}>
                <div className="inputbox">
                    <input type="text" required="required" id="name" />
                    <span>Name</span>
                </div>
                <div className="inputbox">
                    <input type="text" required="required" id="message" />
                    <span>Message</span>
                </div>
                <div className="inputbox">
                    <input type="text" required="required" id="amount" />
                    <span>Amount</span>
                </div>
                <div className="inputbox">
                    <input type="submit" value="Pay"  disabled={!state.contract}/>
                </div>
            </form>
        </div>
    );
}
export default Buy;