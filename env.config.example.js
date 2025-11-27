export default function envApiServer() {
    let baseLocation = window.location.origin;

    const scoolday = "http://www.scoolday.com";
    const prod = "https://www.ipnetuniversity.com:8443";
    const local = "http://localhost:8080/ipnetuniversity";
    const test = "http://test.ipnetuniversity.com:8280";

    if (baseLocation.includes('ipnetuniversity')) {
        if (baseLocation.includes('test')) {
            return test;
        }
        return prod;
    }

    if (baseLocation.includes('scoolday')) {
        return scoolday;
    }
    
    return local;
}