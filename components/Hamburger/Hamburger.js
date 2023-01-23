import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { signOut, useSession } from "next-auth/react";

const HamburgerMenu = (props) => {
  const data = props.data;
  const { status, data: session } = useSession();
  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
  };

  
  return (
    <div style={{display:'flex', justifyContent:'flex-start', width:'100%'}}>
        <div className="relative p-2">
            <Menu
                customBurgerIcon={<HamburgerIcon/>}
                width={"auto"}
                className="left-0 top-12"
            >
            <Link style={{ margin:'0', color: "#FFFFFF" }} href="/">
                HOME
            </Link>
            <div style={{display:'flex', marginBottom:'5px', flexDirection:'column'}} >
                <div style={{fontStyle:'10px',color: "#FFFFFF"}}>
                    PRODUCTS:
                </div>
                {data &&
                data.map((cat) => (
                    <>
                    <Link style={{marginLeft:'10px',marginTop:'20px', color:'#bdc3c7', fontWeight:'bold'}} href={`/category/${cat.name}`} key={cat._id}>
                        <h3 key={cat.name}>All {cat.name}</h3>
                    </Link>
                    {cat.brands &&
                        cat.brands.map((brand) => (
                        <Link href={`/${brand.brandName}`} key={brand._id}>
                            {brand.brandName}
                        </Link>
                        ))}
                    </>
                ))}
            </div>
            <Link style={{ margin:'0', color: "#FFFFFF" }} href="/faq">FAQ</Link>
            <Link style={{ margin:'0', color: "#FFFFFF" }} href="/contact">CONTACT</Link>

      <div>
            {status === "loading" ? (
          "LOADING"
        ) : session?.user ? (
          	<>       
            <div style={{fontStyle:'10px',color: "#FFFFFF"}}>MY ACCOUNT</div>
                <Link href="/profile">
                  Profile
                </Link>
              {session.user.isAdmin && (
                  <Link href="/admin/dashboard">
                    Admin Dashboard
                  </Link>
              )}
                <div style={{marginLeft:'15px'}} onClick={logoutHandler}>
                  Logout
                </div>
          </>
        ) : (
          <Link href="/login">
            LOGIN
          </Link>
        )}
      </div>
      <Link style={{ margin:'0', color: "#FFFFFF" }} href="/checkout">CART ({props.totalCartItems})</Link>
        </Menu>
        </div>
    </div>
  );
};

const HamburgerIcon = () => (

    <div className="p-1/2" style={{color:'black'}}>
      <svg
        className="w-8 h-8 text-gray-500"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </div>

);

export default HamburgerMenu;
