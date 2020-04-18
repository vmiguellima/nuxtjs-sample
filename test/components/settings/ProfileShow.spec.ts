import { shallowMount } from "@vue/test-utils"
import ProfileShow from "@/components/settings/ProfileShow.vue"

describe("ProfileShow component", () => {
  let wrapper;
  let $store;
  
  beforeEach(() => {
    $store = { getters: { 'user/data': { image: { url: null } } } }
    wrapper = shallowMount(ProfileShow, {
      propsData: {
        user: { nickname: 'demo' }
      },
      mocks: { $store },
    });
  });
  
  it("has the expected html structure", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  
  it("has the expected nickname element", () => {
    expect(wrapper.contains('v-text-field[label="Nickname"]')).toBe(true)
  })
  
  it("has the expected button element", () => {
    expect(wrapper.contains('v-btn[disabled="true"]')).toBe(true)
  })

  it("has the expected default image", () => {
    expect(wrapper.contains('v-img[src="/user.png"]')).toBe(true)
  });
});

describe("ProfileShow component with custom user image", () => {
  let wrapper;
  let $store;
  
  beforeEach(() => {
    $store = { getters: { 'user/data': { image: { url: '/custom_image.png' } } } }
    wrapper = shallowMount(ProfileShow, {
      propsData: {
        user: { nickname: 'demo' }
      },
      mocks: { $store },
    });
  });

  it("has the expected custom image", () => {
    const img = wrapper.find('v-img')
    // FIXME: set process.env.storeUrl
    expect(img.attributes().src).toBe('undefined/custom_image.png')
  });
});
