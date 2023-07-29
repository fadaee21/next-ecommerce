import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import { Children } from "type";

const Layout = ({ children }: Children) => {
  const { logout } = useAuth();
  return (
    <section className="profile_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <Link className="list-group-item" href={"/profile"}>
                اطلاعات کاربر
              </Link>
              <Link className="list-group-item" href={"/profile/addresses"}>
                آدرس ها
              </Link>
              <Link className="list-group-item" href={"/profile/orders"}>
                سفارشات
              </Link>
              <Link className="list-group-item" href={"/profile/transactions"}>
                تراکنش ها
              </Link>
              <Link
                role="button"
                href={""}
                className="list-group-item"
                onClick={logout}
              >
                خروج
              </Link>
            </ul>
          </div>
          <div className="col-sm-12 col-lg-9">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
