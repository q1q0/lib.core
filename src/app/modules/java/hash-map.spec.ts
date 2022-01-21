import { HashMap} from "./hash-map";

describe("HashMap", ()=>{
    it("should create", ()=>{
        new HashMap();
        new HashMap<string, number>();
    });

    it("should set/get value", ()=>{
        const m: HashMap<string, number> = new HashMap();
        const key = "test";
        const value = Date.now();
        m.set(key, value);
        
        expect(m.get(key)).toEqual(value);
    });

    it("should removed item correctly", ()=>{
        const m: HashMap<string, number> = new HashMap();
        const key = "test";
        const value = Date.now();
        m.set(key, value);
        m.delete(key);

        expect(m.get(key)).toBeUndefined();
    });

    it("should return value of size correctly", ()=>{
        const m: HashMap<string, number> = new HashMap();
        const key = "test";
        const value = Date.now();
        m.set(key, value);
        m.set("asfdasfa", 12313);
        
        expect(m.size).toEqual(2);
    });

    it("should clear the map when clear is called", ()=>{
        const m: HashMap<string, number> = new HashMap();
        const key = "test";
        const value = Date.now();
        m.set(key, value);
        m.set("asfdasfa", 12313);

        expect(m.size).toEqual(2);

        m.clear();
        expect(m.size).toEqual(0);
    });
});